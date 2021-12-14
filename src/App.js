import Simple from "./components/Simple";
import Dropzone from "./components/Dropzone";

function App() {
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Simple />
      </div>
      <div>
        <Dropzone />
      </div>
    </div>
  );
}

export default App;
