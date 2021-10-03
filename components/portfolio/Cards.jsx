import Card from "./Card";
import Slide from "../motion/Slide";
import portfolio_items from "./portfolio_items.json";

export default function Cards() {
  return (
    <div className="flex flex-col gap-y-6 p-1">
      {portfolio_items.map((data, index) => {
        return <Card data={data} key={data.id} />;
      })}
    </div>
  );
}
