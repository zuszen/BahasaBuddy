
import {X, TriangleAlert, CircleCheck, CircleAlert} from "lucide-react";

import "../styles/Alert.css";
import type { AlertType } from "../types/AlertType"

interface AlertNotifProps{
    alertMessage: string;
    alertType: AlertType | null;
    onAlertMessage: (alertMsg: string) => void;
    onAlertType: (alertType: AlertType | null) => void;
}

function AlertNotif( {alertMessage, alertType, onAlertMessage, onAlertType}: AlertNotifProps ) {

    const removeAlert = () => {
        onAlertMessage("");
        onAlertType(null);
    }

    return(
        <div 
            className={`alert-container ${alertType}`}
            role="alert"
            >
            <div className="icon-container">
                {alertType === "success" && <CircleCheck size={20} />}
                {alertType === "warning" && <TriangleAlert size={20} />}
                {alertType === "error" && <CircleAlert size={20} />}
            </div>

            {alertMessage}
            <button onClick={removeAlert}>
                <X size={18} />
            </button>
        </div>
    );
}

export default AlertNotif;