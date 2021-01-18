function damageFormula(max , min){
    return Math.floor(Math.random() * (max - min)) + min;
}

function healRandom(max, min){
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            round: 0,
            specialAttackDisabled: false
        }
    },
    computed:{
        updateMonsterBar(){
            return {width: this.monsterHealth + '%'};
        },
        updatePlayerBar(){
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return this.round % 3 !== 0;
        }
    },
    methods: {
        attackMonster(){
            this.round++
            //create attackValue with max and min for damage formula
           const attackValue = damageFormula(12, 5);
            // After attack monster health will be decreased
           this.monsterHealth -= attackValue;
            // And after this attack monster hit too so our health will be decreased too
           this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = damageFormula(15, 8);

            this.playerHealth -= attackValue;
        },
        specialAttackMonster(){
            this.round++;

            const attackValue = damageFormula(25, 10)

            this.monsterHealth -= attackValue

            this.attackPlayer();
        },
        healPlayer(){
            this.round++;
            const healValue = healRandom(20, 8);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100
            }else{
                this.playerHealth += healValue;
            }
           

            this.attackPlayer();
        }
    }
});

app.mount('#game');