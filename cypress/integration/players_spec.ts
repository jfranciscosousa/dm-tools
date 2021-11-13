import { addPlayer } from '../../src/lib/data/players';
import { nextTurn } from '../../src/lib/data/battle';

describe('Initiative Tracker', () => {
	beforeEach(() => {
		indexedDB.deleteDatabase('DMToolsDB');
	});

	function insertPlayer(player, initiative) {
		cy.get('input[name=playerName]').type(player);
		cy.get('input[name=initiative]').type(initiative);
		cy.get('form').submit();
	}

	it('enters a player into the initiative list', () => {
		cy.visit('/initiative');

		insertPlayer('Warrior Elf 420', '12');

		cy.contains('Warrior Elf 420').should('be.visible');
	});

	it('sorts players based on initiative', () => {
		cy.visit('/initiative');

		insertPlayer('Warrior Elf 420', '12');
		insertPlayer('Barbarian', '18');
		insertPlayer('Ranger', '8');

		cy.get('ul').should(($el) => {
			const players = [];
			$el.children().each((_index, $el) => {
				players.push($el.textContent.trim());
			});

			expect(players).to.eql([
				'18 - Barbarian Damage: 0',
				'12 - Warrior Elf 420 Damage: 0',
				'8 - Ranger Damage: 0'
			]);
		});
	});

	it('deletes a player from the list', () => {
		cy.visit('/initiative');

		insertPlayer('Warrior Elf 420', '12');
		cy.get('svg').click();
		cy.wait(500);

		cy.get('ul').should('not.contain', 'Warrior Elf 420');
	});

	it('resets the player list', () => {
		cy.visit('/initiative');

		insertPlayer('Warrior Elf 420', '12');
		insertPlayer('Barbarian', '18');
		insertPlayer('Ranger', '8');

		cy.contains('Reset').click();
		cy.wait(500);

		cy.get('ul').should(($el) => {
			expect($el.text()).to.be.empty;
		});
	});

	it('starts a battle at round1 1', () => {
		cy.visit('/initiative');

		insertPlayer('Warrior Elf 420', '12');
		insertPlayer('Barbarian', '128');
		insertPlayer('Ranger', '8');

		cy.contains('Start battle').click();

		cy.contains('Round number: 1').should('be.visible');
		cy.get('ul').should(($el) => {
			expect($el.children().first()).to.have.class('currentTurn');
		});
	});

	it('changes the active player after ending a turn', () => {
		cy.visit('/initiative');

		insertPlayer('Warrior Elf 420', '12');
		insertPlayer('Barbarian', '128');

		cy.contains('Start battle').click();
		cy.contains('Next turn').click();

		cy.contains('Round number: 1').should('be.visible');
		cy.get('ul').should(($el) => {
			expect($el.children().first()).to.not.have.class('currentTurn');

			expect($el.children().last()).to.have.class('currentTurn');
		});
	});

	it('moves on to the next round', () => {
		cy.visit('/initiative');

		insertPlayer('Warrior Elf 420', '12');
		insertPlayer('Barbarian', '128');

		cy.contains('Start battle').click();
		cy.contains('Next turn').click();
		cy.contains('Next turn').click();

		cy.contains('Round number: 2').should('be.visible');
		cy.get('ul').should(($el) => {
			expect($el.children().first()).to.have.class('currentTurn');
		});
	});

	it('loads the data in the localStorage', () => {
		cy.visit('/initiative', {
			onBeforeLoad: async (window) => {
				await addPlayer({ name: 'Fernando', initiative: 20 });
				await addPlayer({ name: 'Coiso', initiative: 10 });
				await nextTurn();
				await nextTurn();
				await nextTurn();
				await nextTurn();
			}
		});

		cy.contains('20 - Fernando').should('be.visible');
		cy.contains('10 - Coiso').should('be.visible');
		cy.contains('Round number: 2').should('be.visible');
		cy.get('ul').should(($el) => {
			expect($el.children().last()).to.have.class('currentTurn');
		});
	});
});
