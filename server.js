import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// ==================== CONFIGURARE DE BAZĂ ====================
const app = express();
const PORT = process.env.PORT || 10000;
const JWT_SECRET = process.env.JWT_SECRET || "secretul_meu_super_secret";

// pentru __dirname în ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware-uri
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==================== CONECTARE MONGODB ====================
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "imobilia_market",
  })
  .then(() => console.log("✅ Conectat la MongoDB Atlas"))
  .catch((err) => console.error("❌ Eroare MongoDB:", err));

// ==================== SCHEME & MODELE ====================
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  parola: String,
});

const anuntSchema = new mongoose.Schema({
  titlu: String,
  descriere: String,
  pret: Number,
  categorie: String,
  imagine: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Anunt = mongoose.model("Anunt", anuntSchema);

// ==================== MIDDLEWARE AUTENTIFICARE ====================
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Lipsă token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid" });
  }
}

// ==================== CONFIGURARE UPLOAD IMAGINI ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ==================== RUTE AUTENTIFICARE ====================

// Înregistrare user nou
app.post("/api/register", async (req, res) => {
  try {
    const { email, parola } = req.body;
    const hashedPassword = await bcrypt.hash(parola, 10);

    const user = new User({ email, parola: hashedPassword });
    await user.save();

    res.json({ message: "✅ Utilizator creat cu succes" });
  } catch (err) {
    res.status(400).json({ error: "Eroare la înregistrare sau utilizatorul există deja" });
  }
});

// Login user
app.post("/api/login", async (req, res) => {
  try {
    const { email, parola } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(parola, user.parola);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Eroare server la login" });
  }
});

// ==================== RUTE ANUNȚURI ====================

// ✅ Creare anunț nou
app.post("/api/anunturi", authMiddleware, upload.single("imagine"), async (req, res) => {
  try {
    const { titlu, descriere, pret, categorie } = req.body;
    const imagine = req.file ? `/uploads/${req.file.filename}` : null;

    const anunt = new Anunt({
      titlu,
      descriere,
      pret,
      categorie,
      imagine,
      userId: req.user.id,
    });

    await anunt.save();
    res.json(anunt);
  } catch (err) {
    res.status(400).json({ error: "Eroare la crearea anunțului" });
  }
});

// ✅ Obține toate anunțurile
app.get("/api/anunturi", async (req, res) => {
  try {
    const anunturi = await Anunt.find();
    res.json(anunturi);
  } catch {
    res.status(500).json({ error: "Eroare la încărcarea anunțurilor" });
  }
});

// ✅ Obține un anunț după ID
app.get("/api/anunturi/:id", async (req, res) => {
  try {
    const anunt = await Anunt.findById(req.params.id);
    if (!anunt) return res.status(404).json({ error: "Anunțul nu există" });
    res.json(anunt);
  } catch {
    res.status(500).json({ error: "Eroare server" });
  }
});

// ✅ Anunțurile unui utilizator
app.get("/api/anunturile-mele", authMiddleware, async (req, res) => {
  try {
    const anunturi = await Anunt.find({ userId: req.user.id });
    res.json(anunturi);
  } catch {
    res.status(500).json({ error: "Eroare la încărcarea anunțurilor utilizatorului" });
  }
});

// ✅ Editare anunț
app.put("/api/anunturi/:id", authMiddleware, async (req, res) => {
  try {
    const { titlu, descriere, pret, categorie } = req.body;

    const anunt = await Anunt.findById(req.params.id);
    if (!anunt) return res.status(404).json({ error: "Anunțul nu există" });

    if (anunt.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Nu ai voie să modifici acest anunț" });
    }

    anunt.titlu = titlu || anunt.titlu;
    anunt.descriere = descriere || anunt.descriere;
    anunt.pret = pret || anunt.pret;
    anunt.categorie = categorie || anunt.categorie;

    await anunt.save();
    res.json({ message: "✅ Anunț actualizat cu succes", anunt });
  } catch (err) {
    res.status(500).json({ error: "Eroare server la actualizare" });
  }
});

// ✅ Ștergere anunț
app.delete("/api/anunturi/:id", authMiddleware, async (req, res) => {
  try {
    const anunt = await Anunt.findById(req.params.id);
    if (!anunt) return res.status(404).json({ error: "Anunțul nu există" });

    if (anunt.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Nu ai voie să ștergi acest anunț" });
    }

    await anunt.deleteOne();
    res.json({ message: "✅ Anunț șters cu succes" });
  } catch (err) {
    res.status(500).json({ error: "Eroare server la ștergere" });
  }
});

// ==================== PORNIRE SERVER ====================
app.listen(PORT, () => {
  console.log(`✅ Server Imobilia Market pornit pe portul ${PORT}`);
});
