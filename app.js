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
            specialAttackDisabled: false,
            winner: null
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw'
            }else if(value <= 0){
                this.winner = 'monster'
            }

        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw'
            }else if(value <= 0){
                this.winner = 'player'
            }

        }
    },
    computed:{
        updateMonsterBar(){
            if(this.monsterHealth < 0){
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'};
        },
        updatePlayerBar(){
            if(this.playerHealth < 0){
                return { width: '0%'}
            }
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
        },
        surrend(){
            this.winner = 'monster'
        },
        resetGame(){
            this.playerHealth = 100
            this.monsterHealth = 100
            this.round = 0
            this.winner = null
        }
    }
});

app.mount('#game');