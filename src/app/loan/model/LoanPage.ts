import { Pageable } from "../../core/model/Pageable";
import { Loan } from "./Loan";

export class LoanPage {
    content: Loan[];
    pageable: Pageable;
    totalElements: number;
}
