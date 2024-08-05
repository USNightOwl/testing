export class Header {
  element = {
    logoBtn: () => cy.contains("a", "Baitaptracnghiem"),
    searchOpen:()=> cy.get("button>span").contains("span", "tìm kiếm"),
    searchInput:()=> cy.get("#simple-search"),
    searchBtn: ()=>  cy.get("button[type='submit']"),
  }

  enterSearchInput(text: string){
    this.element.searchOpen().click();
    this.element.searchInput().type(text);
  }

  clickSearchButton(){
      this.element.searchBtn().click();
  }
}
