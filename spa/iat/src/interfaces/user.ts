export interface UserInfo {
  birthYear: number;
  gender: 0 | 1 | 2;
  edu: "mid" | "sen" | "bachelor" | "graduate" | "doctor" | "";
  dysopia:
    | "none"
    | "red_all"
    | "green_all"
    | "blue_yellow_all"
    | "all"
    | "all_weak"
    | "red_weak"
    | "green_weak"
    | "blue_yellow_weak"
    | "";
  relation:
    | "single"
    | "loved"
    | "engaged"
    | "married"
    | "broke"
    | "divorced"
    | "other"
    | "";
  hunger: number;
}
