import MusicList from "./components/MusicList";
import SingleMusic from "./components/SingleMusic";

function App() {
  return (
    <div className="px-10 w-full flex  gap-10">
      <div className="flex w-[50%] ">
        <MusicList />
      </div>
      <div className="flex w-[50%] ">
        <SingleMusic />
      </div>
    </div>
  );
}

export default App;
