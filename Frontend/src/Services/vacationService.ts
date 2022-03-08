import { io, Socket } from "socket.io-client";
import VacationModel from "../Models/VacationModel";

class VacationService {

    public socket: Socket;

    public connect(): void {
        this.socket = io("http://localhost:3010");
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

    // Add/Update vacation
    public send(vacation: VacationModel): void {
        this.socket = io("http://localhost:3010");
        this.socket.emit("msg-from-client", vacation);
    }

    // Delete vacation
    public delete(id: number): void {
        this.socket = io("http://localhost:3010");
        this.socket.emit("client-delete-vacation", id);

    }

}

export default VacationService;
