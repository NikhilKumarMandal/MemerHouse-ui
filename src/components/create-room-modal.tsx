import  { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Globe, Users2, Lock, Mic } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store";
import { Room } from "@/Types/types";
import { createRoom } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const formSchema = z.object({
  topic: z.string().min(1, "Topic is required").max(100, "Topic must be 100 characters or less"),
  roomType: z.enum(["open", "social", "private"]),
  owner: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface CreateRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateRoom: (data: FormData) => void;
}

const roomFrom = async (room: Room) => {
  const { data } = await createRoom(room);
  return data;
};

function CreateRoomModal({ open, onOpenChange, onCreateRoom }: CreateRoomModalProps) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors }, reset, setError } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: "", roomType: "open", owner: "" },
  });

  useEffect(() => {
    if (user?._id) {
      reset({ owner: user._id, topic: "", roomType: "open" });
    }
  }, [user, reset]);

  const { mutate } = useMutation({
    mutationKey: ["room"],
    mutationFn: roomFrom,
    onSuccess: (data) => {
      console.log("Room created successfully:", data);
      reset();
      onOpenChange(false);
      navigate(`/room/${data.data._id}`)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
      setError("root", { type: "server", message: errorMessage });
    },
  });

  const onSubmit = (data: FormData) => {
    onCreateRoom(data);
    mutate(data);
  };

  return (
 <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90%] w-[400px] bg-zinc-900 border-zinc-800 text-white">
        <div className="px-4 sm:px-6 py-5 sm:py-6">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-lg sm:text-xl font-medium text-center">
              Enter the topic to be discussed
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="topic" className="sr-only">Topic</Label>
                <Controller
                  name="topic"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="topic"
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus-visible:ring-emerald-500 h-12"
                      placeholder="What do you want to talk about?"
                    />
                  )}
                />
                {errors.topic && (
                  <p className="mt-2 text-sm text-red-500">{errors.topic.message}</p>
                )}
              </div>
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-medium">Room types</h3>
                <div className="space-y-2">
                  <Controller
                    name="roomType"
                    control={control}
                    render={({ field }) => (
                      <>
                        {[
                          { type: "open", icon: Globe, label: "Open" },
                          { type: "social", icon: Users2, label: "Social" },
                          { type: "private", icon: Lock, label: "Private" }
                        ].map(({ type, icon: Icon, label }) => (
                          <Button
                            key={type}
                            type="button"
                            variant="outline"
                            className={`w-full flex items-center justify-center gap-3 h-14 ${
                              field.value === type
                                ? "bg-emerald-600 hover:bg-emerald-600 border-emerald-500"
                                : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                            }`}
                            onClick={() => field.onChange(type)}
                          >
                            <Icon className="h-6 w-6" />
                            <span>{label}</span>
                          </Button>
                        ))}
                      </>
                    )}
                  />
                </div>
                <Controller
                  name="roomType"
                  control={control}
                  render={({ field }) => (
                    <p className="text-sm text-zinc-400 text-center">
                      {field.value === "open" && "Start a room, open to everyone"}
                      {field.value === "social" && "Start a room with people you choose"}
                      {field.value === "private" && "Start a private room"}
                    </p>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12"
              >
                <Mic className="mr-2 h-5 w-5" />
                Let&apos;s go
              </Button>
              {errors.root && (
                <p className="mt-2 text-sm text-red-500 text-center">{errors.root.message}</p>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRoomModal;
