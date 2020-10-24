describe("Initiative Tracker", () => {
  it("enters a player into the initiative list", () => {
    cy.visit("/");

    cy.get("input[name=playerName]").type("Warrior Elf 420");
    cy.get("input[name=playerName]").type("12");
    cy.get("form").submit();

    cy.get("ul").should("contain", "Warrior Elf 420");
  });

  it("sorts players based on initiative", () => {
    cy.visit("/");

    cy.get("input[name=playerName]").type("Warrior Elf 420");
    cy.get("input[name=initiative]").type("12");
    cy.get("form").submit();

    cy.get("input[name=playerName]").type("Barbarian");
    cy.get("input[name=initiative]").type("18");
    cy.get("form").submit();

    cy.get("input[name=playerName]").type("Ranger");
    cy.get("input[name=initiative]").type("8");
    cy.get("form").submit();

    cy.get("ul").should(($el) => {
      const players = [];
      $el.children().each((_index, $el) => {
        players.push($el.textContent.trim());
      });

      expect(players).to.eql([
        "Barbarian - 18",
        "Warrior Elf 420 - 12",
        "Ranger - 8",
      ]);
    });
  });

  it("deletes a player from the list", () => {
    cy.visit("/");

    cy.get("input[name=playerName]").type("Warrior Elf 420");
    cy.get("input[name=playerName]").type("12");
    cy.get("form").submit();
    cy.get("svg").click();
    cy.wait(500);

    cy.get("ul").should("not.contain", "Warrior Elf 420");
  });

  it("resets the player list", () => {
    cy.visit("/");

    cy.get("input[name=playerName]").type("Warrior Elf 420");
    cy.get("input[name=initiative]").type("12");
    cy.get("form").submit();

    cy.get("input[name=playerName]").type("Barbarian");
    cy.get("input[name=initiative]").type("18");
    cy.get("form").submit();

    cy.get("input[name=playerName]").type("Ranger");
    cy.get("input[name=initiative]").type("8");
    cy.get("form").submit();

    cy.contains("Reset").click();

    cy.get("ul").should(($el) => {
      expect($el.text()).to.be.empty;
    });
  });
});
