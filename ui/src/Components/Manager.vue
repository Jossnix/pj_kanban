<template>
<div>
    Manager
    <div id = "allComp">
        <div id = "blockTasks">
            <div class="headItem">Карточки</div>
            <div>Создать карточку</div>
            <div>Изменить карточку</div>
            <div>Удалить карточку</div>
        </div>
        <div id = "blockUsers">
            <div class="headItem">Пользователи</div>
            <div>Создать пользователя</div>
            <div>Изменить пользователя</div>
            <div>Удалить пользователя</div>
        </div>
    </div>
</div>
</template>

<script>

</script>
<style>
#allComp {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns:  1fr 1fr;
  /* grid-gap: 0.2vw; */
  height: 100%;
  width: 100%;
  background: rgba(147, 233, 218, 0.925);
  padding: 0px;
}
#blockTasks {
    text-align: center;
    /* margin-left: 10px; */
}

#blockUsers {
    text-align: center;
    /* margin-right: 10px; */
}

.headItem {
    color: #c46d4b;
}
</style>
