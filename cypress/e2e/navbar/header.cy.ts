import { Header } from "../../pages/header";

describe("Test navigation", () => {
  beforeEach(() => {
    cy.login();
    cy.viewport('macbook-15')
    
  })

  it("Have Logo to go home", () => {
    const header = new Header();
    header.element.logoBtn().click();
    cy.location().should((location) => {
      expect(location.hash).to.be.empty
      expect(location.href).to.eq('http://localhost:3000/testing-cypress/')
      expect(location.host).to.eq('localhost:3000')
      expect(location.hostname).to.eq('localhost')
      expect(location.origin).to.eq('http://localhost:3000')
      expect(location.pathname).to.eq('/testing-cypress/')
      expect(location.port).to.eq('3000')
      expect(location.protocol).to.eq('http:')
      expect(location.search).to.be.empty
    })
  });

  it("Test Search with keyword 'hoa'", () => {
    const header = new Header();
    header.enterSearchInput("hoa");
    header.clickSearchButton();

    // have pagination
    cy.get("#componentContainer > li").should('have.length', 7);

    // total 74 page
    cy.get("#componentContainer > li").eq(5).should('have.text', '74');
  })

  it("Load page exercise", () => {
    cy.visit(Cypress.env('exercises_url')+'/bai-tap-tieng-anh');
    cy.wait(2000);
    cy.get(".min-h-screen").first().within(()=>{
      cy.get("a").should("have.length", 10);
    })

    cy.get("#componentContainer > li").eq(5).should('have.text', '10');
  });

  it("Do exercise", () => {
    cy.visit(Cypress.env('exercises_url')+'/bai-tap-tieng-anh');
    cy.wait(2000);

    cy.get(".min-h-screen").first().within(()=>{
      cy.get("a").eq(2).click();
    })

    cy.wait(2000);
    // each question have 4 options
    cy.get("h1 > p").each(($el, index) => {
      cy.wrap($el).parent().parent().find("p > label").should("have.length", 3);
      // select random answer
      cy.wrap($el).parent().parent().find("p > input").eq(index%3).check();
    });

    cy.get("button[type='button']").click();
    cy.wait(2000);

    // check result
    cy.get("span").should("have.text", "11/20")
    cy.get("h1").last().should("have.text", "5.5")

    // have 3 buttons control
    cy.get("button > i").should("have.length", 3);
    cy.get("button > i").first().parent().contains("Thử làm lại");
    cy.get("button > i").eq(1).parent().contains("Xem đáp án chi tiết");
    cy.get("button > i").last().parent().contains("Làm các đề khác");

    // have quote
    cy.wait(1000);
    cy.get("i > b").invoke('text').then((text) => {
      expect(text.trim().length).to.greaterThan(0);
    });
  })
})