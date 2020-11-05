import React from 'react';
import './app.scss';
import './renterProfile.scss';

import UploadImg from '../comps/UploadImg';

import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import ProfileCard from '../comps/ProfileCard';
import ReviewCard from '../comps/ReviewCard';

import BottomNav from '../comps/BottomNav';

export default function Home() {
    return <div className="app">
        <Header />

        <ProfileCard msgState={true} />


        <div className="imageDiv">
            <h2>Lenders Items</h2>
            <div className="images">
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
        </div>


        <div className="imageDiv">
            <h2>Successful Lends</h2>
            <div className="images">
                <ReviewCard />
                <ReviewCard />
            </div>
        </div>

        <div className="nav">
            <BottomNav />
        </div>
    </div>
}


// export default function Home() {
//     return <div>
//         <div className="post">
//             <Header />
//         </div>


//         <div className="imageDiv">
//             <h2>Lenders Items</h2>
//             <div className="images">
//                 <ReviewCard />
//                 <ReviewCard />
//                 <ReviewCard />
//                 <ReviewCard />
//                 <ReviewCard />
//                 <ReviewCard />
//                 <ReviewCard />
//             </div>
//         </div>


{/* <div className="post">
            <CategoriesDropdown />
            <InputParagraph title={"Description"} placeholder="Write a description of the item you're renting out."></InputParagraph>
            <Input title={"Meeting Location"} placeholder="123 Main St."></Input>
            <div className="button">
                <Button text={"Post"}></Button>
            </div>
        </div> */}

{/* <div className="nav">
    <BottomNav />
</div>
    </div >
} */}