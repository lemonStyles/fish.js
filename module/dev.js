import { exec } from "child_process";
import { createServer } from "net";
import chokidar from "chokidar";

// Port yang dapat diatur (sesuai kebutuhan Anda)
const startingPort = 8080;

// Host yang dapat diatur (misalnya, 'localhost' atau '127.0.0.1')
const serverHost = "localhost";

// Direktori yang akan dimonitor
const watchDirectory = "app";

function startServer(port) {
  exec(
    `live-server ${watchDirectory} --port=${port} --host=${serverHost} --no-browser`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      console.error(stderr);
    }
  );
}

function findAvailablePort(startingPort, callback) {
  const server = createServer();
  server.listen(startingPort, () => {
    server.once("close", () => {
      callback(startingPort);
    });
    server.close();
  });
  server.on("error", (err) => {
    findAvailablePort(startingPort + 1, callback);
  });
}

findAvailablePort(startingPort, (availablePort) => {
  console.log(` http://${serverHost}:${availablePort}`);
  startServer(availablePort);

  // Membuat instansi chokidar untuk memantau perubahan berkas
  const watcher = chokidar.watch(watchDirectory);

  watcher.on("change", (path) => {
    console.log(`File modified: ${path}`);
  });
});
