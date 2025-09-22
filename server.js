import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ==================== CONFIGURARE ====================
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secretul_meu_super_secret";

// pentru __dirname în ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==================== CONECTARE MONGODB ====================
const MONGO = process.env.MONGO_URI;
console.log("🔑 DEBUG MONGO_URI =", MONGO);

mongoose
  .connect(MONGO, { dbName: "imobilia_market" })
  .then(() => console.log("✅ Conectat la MongoDB Atlas"))
  .catch((err) => console.error("❌ Eroare MongoDB:", err));

// ==================== SCHEME ====================
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  parola: String,
});

const anuntSchema = new mongoose.Schema({
  titlu: String,
  descriere: String,
  pret: Number,
  categorie: String,
  imagini: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Anunt = mongoose.model("Anunt", anuntSchema);

// ==================== MIDDLEWARE ====================
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Lipsește token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token invalid" });
  }
}

// ==================== UPLOAD ====================
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ==================== AUTENTIFICARE ====================
app.post("/api/register", async (req, res) => {
  try {
    const { email, parola } = req.body;
    const hashedPassword = await bcrypt.hash(parola, 10);
    const user = new User({ email, parola: hashedPassword });
    await user.save();
    res.json({ message: "✅ Utilizator creat cu succes" });
  } catch {
    res.status(400).json({ error: "Eroare la înregistrare sau utilizatorul există deja" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, parola } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(parola, user.parola);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch {
    res.status(500).json({ error: "Eroare server la login" });
  }
});

// ==================== ANUNTURI ====================
app.post("/api/anunturi", authMiddleware, upload.array("imagini", 15), async (req, res) => {
  try {
    const { titlu, descriere, pret, categorie } = req.body;
    const imagini = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];

    const anunt = new Anunt({
      titlu,
      descriere,
      pret,
      categorie,
      imagini,
      userId: req.user.id,
    });

    await anunt.save();
    res.json(anunt);
  } catch (err) {
    console.error("Eroare la crearea anunțului:", err);
    res.status(400).json({ error: "Eroare la crearea anunțului" });
  }
});

app.get("/api/anunturi", async (req, res) => {
  try {
    const anunturi = await Anunt.find();
    res.json(anunturi);
  } catch {
    res.status(500).json({ error: "Eroare la încărcarea anunțurilor" });
  }
});

app.get("/api/anunturi/:id", async (req, res) => {
  try {
    const anunt = await Anunt.findById(req.params.id);
    if (!anunt) return res.status(404).json({ error: "Anunțul nu există" });
    res.json(anunt);
  } catch {
    res.status(500).json({ error: "Eroare server" });
  }
});

app.get("/api/anunturile-mele", authMiddleware, async (req, res) => {
  try {
    const anunturi = await Anunt.find({ userId: req.user.id });
    res.json(anunturi);
  } catch {
    res.status(500).json({ error: "Eroare la încărcarea anunțurilor utilizatorului" });
  }
});

// ==================== START ====================
app.listen(PORT, () => {
  console.log(`✅ Server Imobilia Market pornit pe portul ${PORT}`);
});
