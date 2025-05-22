export default function GlassContainer({ children }: React.PropsWithChildren) {
  return (
    // add inline-block here to let div shrink to the size of its children
    <div className="inline-block bg-[#3d3464] rounded-lg">
      <div className="rounded-lg border-b border-[#4d4474] hover:bg-[#4d4474] transition-colors cursor-pointer p-2">
        {children}
      </div>
    </div>
  );
}
