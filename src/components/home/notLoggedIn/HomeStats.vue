<template>
    <div id="background">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <img src="@/assets/images/icons/Registered Students.svg" alt="" class="icons">
                    <h3 class="stat">5,679</h3>
                    <p class="small">Registered Students</p>
                </div>
                <div class="col-md-3">
                    <img src="@/assets/images/icons/Helped Students.svg" alt="" class="icons">
                    <h3 class="stat">2,679</h3>
                    <p class="small">Student has been helped to achieve their dreams</p>
                </div>
                <div class="col-md-3">
                    <img src="@/assets/images/icons/Visits.svg" alt="" class="icons">
                    <h3 class="stat">10,000</h3>
                    <p class="small">More than 10,000 people visits our site monthly</p>
                </div>
                <div class="col-md-3">
                    <img src="@/assets/images/icons/Rank.svg" alt="" class="icons">
                    <h3 class="stat">#10</h3>
                    <p class="small">Ranked among the top 10 growing online learning startups in West Africa</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../../style/index.scss';
    #background{
        background: $gradient-reversed;
        padding: 4rem 0;
        color: $white;
        text-align: center;
    }
    .icons{
        height: 120px;
    }
    .stat{
        margin: 1rem;
        font-weight: bold;
        font-size: 2.5rem;
    }
</style>
