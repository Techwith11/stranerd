<template>
    <div id="background">
        <div class="container">
            <h2>What Makes Us Different</h2>
            <div class="d-flex flex-column-reverse flex-md-row justify-content-center align-items-center">
                <div class="col-md-6 mb-3 text-left">
                    <h4>Accessibility</h4>
                    <ul>
                        <li>Certified tutors  with high educational qualifications and experience</li>
                        <li>Round the clock access to tutors</li>
                    </ul>

                    <h4>Prompt service delivery </h4>
                    <ul>
                        <li>We work well with your deadlines</li>
                        <li>Got an assignment due in a hour, we got you</li>
                    </ul>

                    <h4>Money back guarantee</h4>
                    <ul>
                        <li>Guaranteed refund if our service falls short of your expectations</li>
                    </ul>
                </div>
                <img src="@/assets/what_makes_us_different.svg" alt="" class="col-md-6 mb-3">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    #background{
        background: $white;
        padding: 4rem 0;
        color: $text-black;
        text-align: center;
    }
    h2{
        margin-bottom: 3rem;
        font-size: 2.0rem;
        font-weight: bold;
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
