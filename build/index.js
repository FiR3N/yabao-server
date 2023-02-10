import express from "express";
import cors from "cors";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
    }
    catch (e) {
        console.log(e.message);
    }
};
start();
//# sourceMappingURL=index.js.map