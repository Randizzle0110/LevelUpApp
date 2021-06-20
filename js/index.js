/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//game variables
var playerHp = 120;
var monsterHp = 85;
var playerDamage = 15;
var monsterDamage = 5;
var heroicStrike = 30;
var rage = 0;
var playerXpEarned = 0;
var playerXpNeeded = 50;
var playerLevel = 1;
var playerTotalDamage = 0;
var monsterTotalDamage = 0;
var heroicTotalDamage = 0;
var monsterHeroicReturnTotalDamage = 0;
var playerTotalStunDamage = 0;
//output fields
var output = document.querySelector("#output");
var monsterHL = document.querySelector("#monsterHealth");
var playerHL = document.querySelector("#playerHealth");
var level = document.querySelector("#level");
var rageAmt = document.querySelector("#rage");
var xpEarned = document.querySelector("#xpGained");

//the attack button
var attack = document.querySelector("#attack");
attack.style.cursor = "pointer";
attack.addEventListener("click", attackHandler, false);
//the next monster button
var nextMonster = document.querySelector("#nextMonster");
nextMonster.style.cursor = "pointer";
nextMonster.addEventListener("click", nextHandler, false);
nextMonster.disabled = true;
//the HS button
var hStrike = document.querySelector("#heroicStrikeBtn");
hStrike.style.cursor = "pointer";
hStrike.addEventListener("click",hStrikeHandler, false);
hStrike.disabled = true;
//the stun button
var stun = document.querySelector("#stunBtn");
stun.style.cursor = "pointer";
stun.addEventListener("click", stunHandler, false);
stun.disabled = true;
function stunHandler()
{
	stunFn();
}

function hStrikeHandler()
{
	heroicStrikeFn();
}
function attackHandler()
{
  
  normalAttack();
}
function nextHandler()
{
	nextMonstr();
}

function normalAttack()

{
	
	//attacking the monster
	playerHp = playerHp - monsterDamage
	monsterHp = monsterHp - playerDamage
	monsterHL.innerHTML = "Monster Health: " + monsterHp;
	playerHL.innerHTML = "Player Health: " + playerHp;
	console.log("player damage: " + playerDamage);
	console.log("monster damage: " + monsterDamage);
	output.innerHTML = "PLAYER ATTACKED, you did " + playerDamage + " damage to the monster" + "<br>" + "the monster then attacks you for " 
	+ monsterDamage + " damage.";
	//getting total damage for health refresh
	playerTotalDamage  += playerDamage 
	monsterTotalDamage += monsterDamage
	//generating rage for special abilities
	rage += 10
	rageAmt.innerHTML = "Rage: " + rage;
	if(rage > 100)
	{
	 
	rageAmt.innerHTML = "Rage: 100";
	}
	console.log("rage: " + rage);
	//checking to see if you have enough rage to use heroic strike
	if (rage >=20)
	{
		hStrike.disabled = false;
	}
	if (rage >=30)
	{
		stunBtn.disabled = false;
	}
	// check to see if monster and you are both  dead
	
	if(monsterHp <= 0 && playerHp <=0)
	{
		output.innerHTML = "You killed the monster, but before he died he got a final attack off which killed you.GAME OVER";
		monsterHL.innerHTML = "Monster Health: 0" ;
		playerHL.innerHTML = "Player Health: 0";
		attack.disabled = true;
		nextMonster.disabled = true;
	}
	
	
	//checking to see if just the monster is dead
	else if(monsterHp <= 0)
	{
		
		
		
		playerXpEarned = playerXpEarned + 10
		console.log("player xp: " + playerXpEarned);
		xpEarned.innerHTML = "XP Gained: " + playerXpEarned
		console.log("player total damage: " + playerTotalDamage);
		console.log("monster total damage: " + monsterTotalDamage);
		
		monsterHL.innerHTML = "Monster Health: 0" ;
		playerHL.innerHTML = "Player Health: " + playerHp;
		output.innerHTML = "You have killed the monster!";
		//check to see if you level up
		attack.disabled = true;
		nextMonster.disabled = false;
		hStrike.disabled = true;
		
	}
		//checking to see if just you are dead
		else if (playerHp <= 0)
		{
		playerHL.innerHTML = "Player Health: 0";
		output.innerHTML = "You Died.GAME OVER";
		attack.disabled = true;
		nextMonster.disabled = true;
		hStrike.disabled = true;
		}
		
	//checking to see if you have gained enough xp to level up
		if (playerXpEarned >= playerXpNeeded)
		{
			
			LevelUp();
		}
	
	
}

function heroicStrikeFn()
	{
		
		monsterHp = monsterHp - heroicStrike
		playerHp = playerHp - monsterDamage
		monsterHL.innerHTML = "Monster Health: " + monsterHp;
		playerHL.innerHTML = "Player Health: " + playerHp;
		output.innerHTML = "HEROIC STRIKE, you did " + heroicStrike + " damage!" + "<br>" + "the monster then attacks you for " 
		+ monsterDamage + " damage.";
		monsterHeroicReturnTotalDamage += monsterDamage
		heroicTotalDamage += heroicStrike
		rage = rage - 20;
		rageAmt.innerHTML ="Rage: " + rage
		if (rage <=19)
		{
			hStrike.disabled = true;
		}
		else if(rage >100)
		{
			rage = 100;
		}
		if(monsterHp <= 0)
		{
			playerXpEarned = playerXpEarned + 10
			xpEarned.innerHTML = "XP Gained: " + playerXpEarned;
			monsterHL.innerHTML = "Monster Health: 0" ;
			playerHL.innerHTML = "Player Health: " + playerHp;
			output.innerHTML = "You have killed the monster!";
			attack.disabled = true;
			nextMonster.disabled = false;
			hStrike.disabled = true;
		
		}
		//checking to see if you have gained enough xp to level up
		if (playerXpEarned >= playerXpNeeded)
		{
			LevelUp();
		}
	}
	
	
	
function stunFn()
{
		monsterHp = monsterHp - playerDamage
		output.innerHTML = "You have STUNED the monster and you do " + playerDamage + " normal damage" + "<br>" + "the monster is stuned and cannot attack you on this turn.";
		monsterHL.innerHTML = "Monster Health: " + monsterHp;
		playerHL.innerHTML = "Player Health: " + playerHp;
		playerTotalStunDamage += playerDamage
		rage = rage - 30
		rageAmt.innerHTML ="Rage: " + rage;
	if(rage <= 29)
	{
		stunBtn.disabled = true;
	}
	if(rage <= 19)
	{
		hStrike.disabled = true;
	}
	else if(monsterHp <= 0)
		{
			playerXpEarned = playerXpEarned + 10
			xpEarned.innerHTML = "XP Gained: " + playerXpEarned;
			monsterHL.innerHTML = "Monster Health: 0" ;
			playerHL.innerHTML = "Player Health: " + playerHp;
			output.innerHTML = "You have killed the monster!";
			attack.disabled = true;
			nextMonster.disabled = false;
			hStrike.disabled = true;
		}
		//checking to see if you have gained enough xp to level up
		if (playerXpEarned >= playerXpNeeded)
		{
			LevelUp();
		}
}
		
function nextMonstr()
{
	monsterHp = monsterHp + playerTotalDamage + heroicTotalDamage + playerTotalStunDamage
	playerHp = playerHp + monsterTotalDamage + monsterHeroicReturnTotalDamage
	playerTotalDamage = 0;
	monsterTotalDamage = 0;
	heroicTotalDamage = 0;
	monsterHeroicReturnTotalDamage = 0;
	playerTotalStunDamage = 0;
	monsterHL.innerHTML = "Monster Health: " + monsterHp;
	playerHL.innerHTML = "Player Health: " + playerHp;
	attack.disabled = false;
	nextMonster.disabled = true;
	if(rage >= 20)
	{
		hStrike.disabled = false;
	}
}
function LevelUp()
{
	playerHp = playerHp + 40
	monsterHp = monsterHp + 25
	playerDamage = playerDamage + 1
	monsterDamage = monsterDamage + 5
	playerLevel = playerLevel + 1
	playerXpNeeded = playerXpNeeded + 50;
	level.innerHTML = "Level: " + playerLevel;
	output.innerHTML = "Congrats! You have reached level: " + playerLevel;
	console.log("level: " + playerLevel);
	
}

	