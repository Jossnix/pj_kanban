<template>
  <div class="about">
    <div id = "headMessage">
      Для работы необходимо пройти авторизацию
    </div>
    <div id="login-form">
      <h1>АВТОРИЗАЦИЯ</h1>
        <fieldset>
            <form action="javascript:void(0);" method="get">
                <input type="text" required v-model="username" placeholder="Login">
                <input type="password" required v-model="password" placeholder="Password">
                <input type="submit" value="ВОЙТИ" @click="showData()" >
            </form>
        </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    showData () {
      alert(this.username)
    }
  }
}
</script>

<style>
  #login-form {
    background-color: #363636;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    margin: 150px auto;
    width: 300px;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    -webkit-box-shadow:  0px 10px 20px 0px rgba(0, 0, 0, 0.3);
    box-shadow:  0px 10px 20px 0px rgba(0, 0, 0, 0.3);
  }

  #login-form h1 {
    background-color: #292829;
    border-radius: 5px 5px 0px 0px;
    -moz-border-radius: 5px 5px 0px 0px;
    -webkit-border-radius: 5px 5px 0px 0px;
    color: #fff;
    padding: 20px;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
  }

  #login-form fieldset {
    border: none;
    padding: 20px;
    position: relative;
  }

  #login-form fieldset form {
    overflow: hidden;
    width: 270px;
  }

  #login-form fieldset form input {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    outline: none;
    -webkit-appearance:none;
    width: 260px;
    align: center;
    position: center;
  }

  #login-form fieldset form input[type="text"] {
    border: 1px solid #292829;
    border-radius: 3px 3px 0px 0px;
    -moz-border-radius: 3px 3px 0px 0px;
    -webkit-border-radius: 3px 3px 0px 0px;
    padding: 12px 10px;
    width: 238px;
    -webkit-appearance:none;
  }

  #login-form fieldset form input[type="password"] {
    border: 1px solid #292829;
    border-top: none;
    border-radius: 0px 0px 3px 3px;
    -moz-border-radius: 0px 0px 3px 3px;
    -webkit-border-radius: 0px 0px 3px 3px;
    padding: 12px 10px;
    width: 238px;
    -webkit-appearance:none;
  }

  #login-form fieldset form input[type="submit"] {
    background-color: #ebebeb;
    border: none;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    color: #404040;
    cursor: pointer;
    float: none;
    font-weight: bold;
    margin-top: 20px;
    padding: 12px 12px;
    -webkit-appearance: none;
  }

  #login-form fieldset form input[type="submit"]:hover {
    background-color: #e0e0e0;
  }

  #login-form fieldset form span:before {
    background-color: #c9c9c9;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    content: "?";
    display: inline-block;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
    text-align: center;
    width: 20px;
  }

  #login-form fieldset form span {
    font-size: 12px;
    margin-top: 40px;
  }

  #login-form fieldset form span a{
    color: #eb6d1a;
    text-decoration: none;
  }

  #login-form fieldset form span a:hover {
    color: #eb6d1a;
  }

  #headMessage {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    text-align: center;
    margin-top: 10vh;
  }
</style>
