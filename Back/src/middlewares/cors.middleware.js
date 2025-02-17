import cors from "cors";

const corsOptions = {
    origin: "*", // Permite cualquier origen (ajustar en producción)
    methods: ["GET"],
};

export default cors(corsOptions);
