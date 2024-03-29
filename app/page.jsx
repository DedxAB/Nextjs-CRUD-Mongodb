import NotesFeed from "@/components/NotesFeed/NotesFeed";
import UserBanner from "@/components/UserBanner/UserBanner";

const Home = () => {
  return (
    <div className="overflow-y-scroll h-[83vh]" id="customScrollBar">
      {/* UserBanner Welcome */}
      <UserBanner />
      {/* Notes Feed */}
      <NotesFeed />
    </div>
  );
};

export default Home;
