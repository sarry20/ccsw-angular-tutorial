import { Author } from "./Author";
import { Pageable } from "../../core/model/Pageable";

export class AuthorPage {
    content: Author[];
    pageable: Pageable;
    totalElements: number;
}
