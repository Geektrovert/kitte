interface PosterCardProps {
  CTAQuestion?: string;
  CTATitle?: string;
  button1Text?: string;
  button2Text?: string;
}

export default function PosterCard({
  CTAQuestion = "Ready to dive in?",
  CTATitle = "Start your free trial today.",
  button1Text = "Get started",
  button2Text = "Learn more",
}: PosterCardProps) {
  return (
    <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
      <div tw="bg-gray-50 flex w-full">
        <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
          <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
            <span>{CTAQuestion}</span>
            <span tw="text-indigo-600">{CTATitle}</span>
          </h2>
          <div tw="mt-8 flex md:mt-0">
            <div tw="flex rounded-md shadow">
              <a tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">
                {button1Text}
              </a>
            </div>
            <div tw="ml-3 flex rounded-md shadow">
              <a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">
                {button2Text}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
