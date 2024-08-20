import { getProcessQuestions } from "../components/handleFunctions";
import store from "../redux/store";
import { updateGlobalData } from "../redux/actions/global";


export default function masterFunction() {
    getProcessQuestions().then((data) => {
        store.dispatch(updateGlobalData({
            processQuestions: data.processQuestions,
            roiQuestions: data.roiQuestions
        }));
    }).catch((err) => {
        console.log(err);
    });
}