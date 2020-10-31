import { PLAYERS_STORE_KEY } from "../../src/lib/playersStore";

describe("Initiative Tracker", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  function insertPlayer(player, initiative) {
    cy.get("input[name=playerName]").type(player);
    cy.get("input[name=initiative]").type(initiative);
    cy.get("form").submit();
  }

  it("enters a player into the initiative list", () => {
    cy.visit("/");

    insertPlayer("Warrior Elf 420", "12");

    cy.contains("Warrior Elf 420").should("be.visible");
  });

  it("sorts players based on initiative", () => {
    cy.visit("/");

    insertPlayer("Warrior Elf 420", "12");
    insertPlayer("Barbarian", "18");
    insertPlayer("Ranger", "8");

    cy.get("ul").should(($el) => {
      const players = [];
      $el.children().each((_index, $el) => {
        players.push($el.textContent.trim());
      });

      expect(players).to.eql([
        "18 - Barbarian",
        "12 - Warrior Elf 420",
        "8 - Ranger",
      ]);
    });
  });

  it("deletes a player from the list", () => {
    cy.visit("/");

    insertPlayer("Warrior Elf 420", "12");
    cy.get("svg").click();
    cy.wait(500);

    cy.get("ul").should("not.contain", "Warrior Elf 420");
  });

  it("resets the player list", () => {
    cy.visit("/");

    insertPlayer("Warrior Elf 420", "12");
    insertPlayer("Barbarian", "18");
    insertPlayer("Ranger", "8");

    cy.contains("Reset").click();
    cy.wait(500);

    cy.get("ul").should(($el) => {
      expect($el.text()).to.be.empty;
    });
  });

  it("starts a battle at round1 1", () => {
    cy.visit("/");

    insertPlayer("Warrior Elf 420", "12");
    insertPlayer("Barbarian", "128");
    insertPlayer("Ranger", "8");

    cy.contains("Start battle").click();

    cy.contains("Round number: 1").should("be.visible");
    cy.get("ul").should(($el) => {
      expect($el.children().first()).to.have.class(
        "currentTurn"
      );
    });
  });

  it("changes the active player after ending a turn", () => {
    cy.visit("/");

    insertPlayer("Warrior Elf 420", "12");
    insertPlayer("Barbarian", "128");

    cy.contains("Start battle").click();
    cy.contains("Next turn").click();

    cy.contains("Round number: 1").should("be.visible");
    cy.get("ul").should(($el) => {
      expect($el.children().first()).to.not.have.class(
        "currentTurn"
      );

      expect($el.children().last()).to.have.class(
        "currentTurn"
      );
    });
  });

  it("moves on to the next round", () => {
    cy.visit("/");

    insertPlayer("Warrior Elf 420", "12");
    insertPlayer("Barbarian", "128");

    cy.contains("Start battle").click();
    cy.contains("Next turn").click();
    cy.contains("Next turn").click();

    cy.contains("Round number: 2").should("be.visible");
    cy.get("ul").should(($el) => {
      expect($el.children().first()).to.have.class(
        "currentTurn"
      );
    });
  });

  it("gracefully handles a bad schema on local storage", () => {
    cy.visit("/", {
      onBeforeLoad: (window) => {
        window.localStorage.setItem(
          PLAYERS_STORE_KEY,
          JSON.stringify({ bad: "storage" })
        );
      },
    });

    cy.contains("Initiative Tracker").should("be.visible");
  });

  it("gracefully handles invalid json on local storage", () => {
    cy.visit("/", {
      onBeforeLoad: (window) => {
        window.localStorage.setItem(PLAYERS_STORE_KEY, "asd");
      },
    });

    cy.contains("Initiative Tracker").should("be.visible");
  });
});
