<template>
    <div class="container">
        <div class="row">
            <div class="col-12"><h1>Login</h1></div>
        </div>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <form>
                    <div class="form-group">
                        <input type="email" v-model="user.email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="passwordInput" placeholder="Password">
                    </div>
                    <button type="submit" class="btn btn-primary" id="loginButton">Submit</button>
                </form>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
</template>
