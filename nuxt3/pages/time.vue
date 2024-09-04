<template>
    <div> 
        <div>Hello!</div>
        <time>It is currently {{ time }}</time>
    </div>
</template>

<script>
// TODO: Fetch my api from api/getTime & put in a variable
//  do the above 
//  then put the variable in the time tag
const time = await $fetch('/api/getTime')
console.log('time', time);

export default {
    data() {
        return {
            time
        }
    }
}

</script>