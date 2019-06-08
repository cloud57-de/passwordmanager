import { setFilter } from "../api/service";

export function initFilter() {
    document.getElementById("filterexpression").addEventListener('input', (e) => {
        setFilter(e.srcElement.value);
    });
}