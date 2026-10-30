import AppRouter from "./app/router";
import { Toaster } from "./components/ui/sonner";

function App() {
    return (
        <div>
            <Toaster position="top-center" richColors />
            <AppRouter />
        </div>
    );
}

export default App;
