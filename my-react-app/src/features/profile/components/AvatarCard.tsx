import type { RefObject, ChangeEvent } from "react";
import { PROFILE_DATA } from "../../../mock";

const { avatar } = PROFILE_DATA;

interface AvatarCardProps {
  name: string;
  avatarSrc: string | null;
  roleLabel: string;
  fileInputRef: RefObject<HTMLInputElement>;
  onChangeClick: () => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function AvatarCard({ name, avatarSrc, roleLabel, fileInputRef, onChangeClick, onFileChange }: AvatarCardProps) {
  const initial = name.trim().charAt(0) || avatar.fallbackInitial;

  return (
    <div className="order-first flex flex-col items-center gap-3 rounded-2xl border border-brand-border bg-brand-white p-6 text-center lg:order-last lg:col-span-1">
      {avatarSrc ? (
        <img src={avatarSrc} alt="" className="h-20 w-20 rounded-full object-cover" />
      ) : (
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-main text-2xl font-bold text-white">
          {initial}
        </span>
      )}

      <div>
        <p className="text-lg font-bold text-brand-text">{name}</p>
        <span className="mt-1 inline-block rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-brand-main">
          {roleLabel}
        </span>
      </div>

      <button
        type="button"
        onClick={onChangeClick}
        className="rounded-lg border border-brand-border px-4 py-2 text-sm font-bold text-brand-text hover:bg-brand-light"
      >
        {avatar.changeButtonLabel}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}
