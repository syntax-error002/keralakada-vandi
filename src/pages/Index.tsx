import { useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Crop {
  id: string;
  name: string;
  malayalamName: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  market: string;
  lastUpdated: string;
  category: string;
}

const sampleCrops: Crop[] = [
  {
    id: "1",
    name: "Rice",
    malayalamName: "അരി",
    currentPrice: 42,
    previousPrice: 40,
    unit: "kg",
    market: "Kochi",
    lastUpdated: "10 mins ago",
    category: "Grains"
  },
  {
    id: "2", 
    name: "Coconut",
    malayalamName: "തേങ്ങ",
    currentPrice: 25,
    previousPrice: 28,
    unit: "piece",
    market: "Kozhikode",
    lastUpdated: "15 mins ago",
    category: "Fruits"
  },
  {
    id: "3",
    name: "Black Pepper",
    malayalamName: "കുരുമുളക്",
    currentPrice: 520,
    previousPrice: 520,
    unit: "kg", 
    market: "Idukki",
    lastUpdated: "5 mins ago",
    category: "Spices"
  },
  {
    id: "4",
    name: "Cardamom", 
    malayalamName: "ഏലം",
    currentPrice: 1200,
    previousPrice: 1180,
    unit: "kg",
    market: "Munnar",
    lastUpdated: "8 mins ago",
    category: "Spices"
  },
  {
    id: "5",
    name: "Banana",
    malayalamName: "വാഴപ്പഴം",
    currentPrice: 35,
    previousPrice: 32,
    unit: "dozen",
    market: "Thiruvananthapuram", 
    lastUpdated: "12 mins ago",
    category: "Fruits"
  },
  {
    id: "6",
    name: "Rubber",
    malayalamName: "റബ്ബർ",
    currentPrice: 165,
    previousPrice: 170,
    unit: "kg",
    market: "Kottayam",
    lastUpdated: "20 mins ago",
    category: "Cash Crops"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Grains", "Fruits", "Spices", "Cash Crops", "Vegetables"];

  const filteredCrops = sampleCrops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.malayalamName.includes(searchTerm);
    const matchesCategory = selectedCategory === "All" || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-success" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getPriceChange = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage };
  };

  const getPriceChangeColor = (current: number, previous: number) => {
    if (current > previous) return "text-success";
    if (current < previous) return "text-destructive"; 
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="p-4 pb-20">
        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Market Update Banner */}
        <Card className="p-4 mb-6 bg-gradient-card shadow-card border-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Market Status</h3>
              <p className="text-sm text-muted-foreground">Last updated: 5 mins ago</p>
            </div>
            <Badge variant="secondary" className="bg-success text-success-foreground">
              live
            </Badge>
          </div>
        </Card>

        {/* Crop Cards */}
        <div className="grid gap-4">
          {filteredCrops.map((crop) => {
            const { change, percentage } = getPriceChange(crop.currentPrice, crop.previousPrice);
            return (
              <Card key={crop.id} className="p-4 shadow-card border-0 bg-gradient-card hover:shadow-price transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{crop.name}</h3>
                    <p className="text-sm text-muted-foreground">{crop.malayalamName}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {crop.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      ₹{crop.currentPrice}
                    </span>
                    <span className="text-sm text-muted-foreground">/{crop.unit}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(crop.currentPrice, crop.previousPrice)}
                    <span className={`text-sm font-medium ${getPriceChangeColor(crop.currentPrice, crop.previousPrice)}`}>
                      {change !== 0 && (change > 0 ? '+' : '')}₹{Math.abs(change)} ({percentage}%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>📍 {crop.market}</span>
                  <span>⏰ {crop.lastUpdated}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No crops found matching your search.</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation Placeholder */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4">
        <div className="flex justify-center">
          <Button className="bg-gradient-primary hover:opacity-90 w-full max-w-sm">
            Set Price Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
