import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Settings } from 'lucide-react';

interface TimerSettingsProps {
  onTimeChange: (minutes: number) => void;
  defaultTime: number;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({ onTimeChange, defaultTime }) => {
  const [minutes, setMinutes] = React.useState(defaultTime / 60);

  const handleSave = () => {
    onTimeChange(minutes * 60);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تنظیمات تایمر</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minutes" className="text-right">
              زمان (دقیقه)
            </Label>
            <Input
              id="minutes"
              type="number"
              min="1"
              max="120"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <Button onClick={handleSave}>ذخیره</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimerSettings; 