import { useHistory } from "react-router-dom";

export default function CutomRoutePath(props) {
  let history = useHistory();

  function HandleChangeRoute() {
    history.push("/dashboard");
  }

    return (
        { HandleChangeRoute}
  );
}