import { useState, Fragment } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

const AddWorker = (props) => {
  const [enteredWorkerName, setEnteredWorkerName] = useState("");
  const [enteredWage, setEnteredWage] = useState("");
  const [error, setError] = useState();

  const minumumWage = 5000;

  const addWorkerHandler = (e) => {
    e.preventDefault();
    if (enteredWorkerName.trim().length === 0) {
      setError({
        title: "Name field is mandatory!",
        message: "Please write a name.",
      });
      return;
    }

    if (+enteredWage < minumumWage) {
      setError({
        title: "Wage field is mandatory!",
        message: `Please enter a salary value greater than ${minumumWage}`,
      });

      return;
    }
    setEnteredWorkerName("");
    setEnteredWage("");
    props.setWorkers((prevState) => [
      {
        id: Math.floor(Math.random() * 1000),
        name: enteredWorkerName,
        wage: enteredWage,
      },
      ...prevState,
    ]);
    console.log(enteredWorkerName, enteredWage);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && <ErrorModal onConfirm={errorHandler} error={error} />}
      <Card className="mt-10">
        <form className="flex flex-col gap-y-2" onSubmit={addWorkerHandler}>
          <label htmlFor="name" className="font-medium">
            Worker Name
          </label>
          <input
            type="text"
            className="max-w-[40rem] w-full mx-auto border p-2"
            placeholder="Please write the name of the employee"
            id="name"
            onChange={(e) => setEnteredWorkerName(e.target.value)}
            value={enteredWorkerName}
          />
          <label htmlFor="wage" className="font-medium">
            Salary amount
          </label>
          <input
            type="number"
            className="max-w-[40rem] w-full mx-auto border p-2"
            placeholder="Enter salary"
            id="wage"
            onChange={(e) => setEnteredWage(e.target.value)}
            value={enteredWage}
          />
          <Button className="mt-2" type="submit">
            Add
          </Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddWorker;
