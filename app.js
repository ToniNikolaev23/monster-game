function damageFormula(max , min){
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100
        }
    },
    computed:{
        updateMonsterBar(){
            return {width: this.monsterHealth + '%'};
        },
        updatePlayerBar(){
            return {width: this.playerHealth + '%'};
        }
    },
    methods: {
        attackMonster(){
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
        }
    }
});

app.mount('#game');