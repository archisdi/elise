import app from "./app";

const port: number = 3000;

const server = app.listen(port, () => {
  console.log(`App is running at http://127.0.0.1:${port}`);
});

export default server;