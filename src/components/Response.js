import React, { useEffect} from "react";

const Response = ({ response, setResponse }) => {
    // Hide response after 3secods
    useEffect(() => {
      if (response) {
        const timeoutMessage = setTimeout(() => {
          setResponse(null);
        }, 3000);
  
        return () => clearTimeout(timeoutMessage);
      }
    }, [response, setResponse]);

  return (
    <>
      {response && (
        <p className="task-tracker__form__error message">{response}</p>
      )}
    </>
  );
};

export default Response;
