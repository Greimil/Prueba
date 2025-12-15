import Form from "./components/form";
import CardSelection from "./components/CardSelection";
import { useState } from "react";
import type { UpdateCardData } from "./types";

function App() {

  const [selectCard, setselectedCard] = useState<UpdateCardData>()

  return (
    <div className="" >
      <Form   />

      <CardSelection Selectfn={setselectedCard} />
    </div>
  );
}

export default App;
