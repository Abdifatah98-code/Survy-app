// const app =require("./API/App");
const app =require("./API/App");
require("dotenv").config()

const PORT=process.env.PORT || 4000


app.listen(PORT,()=>{ 
    console.log(`APP http://${process.env.DB_HOST || "localhost"}:${PORT}`);})