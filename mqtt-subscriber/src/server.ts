import app from "./routes/index";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Subscriber service is running on port ${PORT}`);
});
