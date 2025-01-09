import LoadingMoon from '@/components/loaders/LoadingMoon';
import { IPostList } from '@/interfaces/blog/IPost';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

interface ComponentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: IPostList;
  handleDelete: (slug: string) => Promise<void>;
  loadingDelete: boolean;
}

export default function DeletePostModal({
  open,
  setOpen,
  post,
  handleDelete,
  loadingDelete,
}: ComponentProps) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  Are you sure you want to delete this post?
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{post?.title}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                disabled={loadingDelete}
                onClick={() => handleDelete(post?.slug)}
                className="inline-flex w-full justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
              >
                {loadingDelete ? <LoadingMoon /> : 'Delete'}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
