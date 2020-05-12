export class Ingredient {
  constructor(ingredient?: object) {
    if (!(ingredient == null)) {
      this.id = ingredient["id"];
      this.name = ingredient["name"];
      this.vege = ingredient["vege"];
    }
  }
  id: string;
  name: string;
  vege: boolean;
}
