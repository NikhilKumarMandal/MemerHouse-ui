import React, { useEffect } from "react";
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

  const { control, handleSubmit, formState: { errors }, reset, setError } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: "", roomType: "open", owner: "" },
  });

  useEffect(() => {
    if (user?.data?._id) {
      reset({ owner: user.data._id, topic: "", roomType: "open" });
    }
  }, [user, reset]);

  const { mutate } = useMutation({
    mutationKey: ["room"],
    mutationFn: roomFrom,
    onSuccess: (data) => {
      console.log("Room created successfully:", data);
      reset();
      onOpenChange(false);
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
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-xl font-medium">Enter the topic to be discussed</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus-visible:ring-emerald-500"
                      placeholder="What do you want to talk about?"
                    />
                  )}
                />
                {errors.topic && <p className="mt-1 text-sm text-red-500">{errors.topic.message}</p>}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Room types</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Controller
                    name="roomType"
                    control={control}
                    render={({ field }) => (
                      <>
                        {["open", "social", "private"].map((type) => (
                          <Button
                            key={type}
                            type="button"
                            variant="outline"
                            className={`flex-col h-auto py-4 px-2 ${
                              field.value === type
                                ? "bg-emerald-600 hover:bg-emerald-600 border-emerald-500"
                                : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                            }`}
                            onClick={() => field.onChange(type)}
                          >
                            {type === "open" && <Globe className="h-8 w-8 mb-2" />}
                            {type === "social" && <Users2 className="h-8 w-8 mb-2" />}
                            {type === "private" && <Lock className="h-8 w-8 mb-2" />}
                            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                          </Button>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={isLoading}
              >
                <Mic className="mr-2 h-5 w-5" />
                Let&apos;s go
              </Button>
              {errors.root && <p className="mt-1 text-sm text-red-500">{errors.root.message}</p>}
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRoomModal;
