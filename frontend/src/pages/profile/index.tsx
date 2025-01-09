import Layout from '@/hocs/Layout';
import validator from 'validator';
import axios from 'axios';

import Container from '@/components/pages/profile/Container';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import { useEffect, useState } from 'react';
import EditText from '@/components/forms/EditText';
import { ToastError, ToastSuccess, ToastWarning } from '@/components/toast/alerts';
import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { loadProfile, loadUser } from '@/redux/actions/auth/actions';
import Button from '@/components/Button';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import EditDate from '@/components/forms/EditDate';
import EditURL from '@/components/forms/EditURL';
import EditRichText from '@/components/forms/EditRichText';
import EditImage from '@/components/forms/EditImage';
import useProfilePicture from '@/hooks/useProfilePicture';
import { fetchS3SignedURL } from '@/utils/api/s3/FetchPresignedUrl';
import uploadProfilePicture from '@/utils/api/profile/UploadProfilePicture';
import useBannerPicture from '@/hooks/useBannerPicture';
import uploadBannerPicture from '@/utils/api/profile/UploadBannerPicture';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import verifyAccess from '@/utils/api/auth/VerifyAccess';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { verified } = await verifyAccess(context);

  if (!verified) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Page() {
  const user = useSelector((state: RootState) => state.auth.user);
  const profile = useSelector((state: RootState) => state.auth.profile);

  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [hasChangesProfile, setHasChangesProfile] = useState<boolean>(false);
  const [hasChangesProfilePicture, setHasChangesProfilePicture] = useState<boolean>(false);
  const [hasChangesBannerPicture, setHasChangesBannerPicture] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [biography, setBiography] = useState<string>('');
  const [birthday, setBirthDay] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [facebook, setFacebook] = useState<string>('');
  const [threads, setThreads] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [youtube, setYouTube] = useState<string>('');
  const [tiktok, setTikTok] = useState<string>('');
  const [github, setGitHub] = useState<string>('');
  const [gitlab, setGitLab] = useState<string>('');

  const {
    profilePicture,
    setProfilePicture,
    percentage: profilePicturePerceentage,
    setPercentage: setProfilePicturePercentage,
    // loading: loadingProfilePicture,
  } = useProfilePicture();

  const {
    bannerPicture,
    setBannerPicture,
    percentage: bannerPicturePercentage,
    setPercentage: setBannerPicturePercentage,
    // loading: loadingBannerPicture,
  } = useBannerPicture();

  const onLoadProfilePicture = (newImage: any) => {
    if (newImage !== profilePicture) {
      setProfilePicture(newImage);
      setHasChangesProfilePicture(true);
    }
  };

  const onLoadBannerPicture = (newImage: any) => {
    if (newImage !== profilePicture) {
      setBannerPicture(newImage);
      setHasChangesBannerPicture(true);
    }
  };

  // Rellenar el estado con datos iniciales de usuario
  useEffect(() => {
    if (user) {
      setUsername(user?.username);
      setFirstName(user?.first_name);
      setLastName(user?.last_name);
    }

    if (profile) {
      setBiography(profile?.biography);
      setBirthDay(profile?.birthday);
      setWebsite(profile?.website);
      setInstagram(profile?.instagram);
      setFacebook(profile?.facebook);
      setThreads(profile?.threads);
      setLinkedin(profile?.linkedin);
      setYouTube(profile?.youtube);
      setTikTok(profile?.tiktok);
      setGitHub(profile?.github);
      setGitLab(profile?.gitlab);
    }
  }, [user, profile]);

  // Detectar cambios
  // Check if profile data has changes and is valid
  const isValidDate = (date: string) => !Number.isNaN(new Date(date).getTime());
  const isValidUrl = (url: string) => validator.isURL(url, { require_protocol: false });
  const isEmpty = (str: string) => {
    // Strip all HTML tags and trim whitespace
    const cleanedContent = str.replace(/<[^>]*>/g, '').trim();
    return cleanedContent === '';
  };

  useEffect(() => {
    if (
      username !== user?.username ||
      firstName !== user?.first_name ||
      lastName !== user?.last_name
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }

    if (
      (biography !== profile?.biography && !isEmpty(biography)) ||
      (birthday !== profile?.birthday && isValidDate(birthday)) ||
      (website !== profile?.website && isValidUrl(website)) ||
      (instagram !== profile?.instagram && isValidUrl(instagram)) ||
      (facebook !== profile?.facebook && isValidUrl(facebook)) ||
      (threads !== profile?.threads && isValidUrl(threads)) ||
      (linkedin !== profile?.linkedin && isValidUrl(linkedin)) ||
      (youtube !== profile?.youtube && isValidUrl(youtube)) ||
      (tiktok !== profile?.tiktok && isValidUrl(tiktok)) ||
      (github !== profile?.github && isValidUrl(github)) ||
      (gitlab !== profile?.gitlab && isValidUrl(gitlab))
    ) {
      setHasChangesProfile(true);
    } else {
      setHasChangesProfile(false);
    }
  }, [
    username,
    firstName,
    user,
    lastName,
    birthday,
    profile,
    website,
    instagram,
    facebook,
    threads,
    linkedin,
    youtube,
    tiktok,
    github,
    gitlab,
    biography,
  ]);

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSaveUserData = async () => {
    // Iniciar objeto vacio para mandar datos
    const updatedData: Record<string, string> = {};

    // Comparar el estado actual con el estado original
    if (username !== user?.username) {
      updatedData.username = username;
    }
    if (firstName !== user?.first_name) {
      updatedData.first_name = firstName;
    }
    if (lastName !== user?.last_name) {
      updatedData.last_name = lastName;
    }

    // Revisar si hay algo para guardar
    if (Object.keys(updatedData).length === 0) {
      ToastWarning('No changes to save.');
      return;
    }

    try {
      // Hacer PUT request con datos actualizados
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        ToastSuccess('User data updated successfully');
        // Actualizar el estado de redux
        await dispatch(loadUser());
      } else {
        ToastError('Failed to update user data');
      }
    } catch (error) {
      ToastError('An error occurred while updating user data');
    }
  };

  const handleSaveProfileData = async () => {
    // Iniciar objeto vacio para mandar datos
    const updatedData: Record<string, string> = {};

    // Comparar el estado actual con el estado original
    if (biography !== profile?.biography) {
      updatedData.biography = biography;
    }
    if (birthday !== profile?.birthday) {
      updatedData.birthday = birthday;
    }
    if (website !== profile?.website) {
      updatedData.website = website;
    }
    if (instagram !== profile?.instagram) {
      updatedData.instagram = instagram;
    }
    if (facebook !== profile?.facebook) {
      updatedData.facebook = facebook;
    }
    if (threads !== profile?.threads) {
      updatedData.threads = threads;
    }
    if (linkedin !== profile?.linkedin) {
      updatedData.linkedin = linkedin;
    }
    if (youtube !== profile?.youtube) {
      updatedData.youtube = youtube;
    }
    if (tiktok !== profile?.tiktok) {
      updatedData.tiktok = tiktok;
    }
    if (github !== profile?.github) {
      updatedData.github = github;
    }
    if (gitlab !== profile?.gitlab) {
      updatedData.gitlab = gitlab;
    }

    // Revisar si hay algo para guardar
    if (Object.keys(updatedData).length === 0) {
      ToastWarning('No changes to save.');
      return;
    }

    try {
      // Hacer PUT request con datos actualizados
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        ToastSuccess('Profile data updated successfully');
        // Actualizar el estado de redux
        await dispatch(loadProfile());
      } else {
        ToastError('Failed to update profile data');
      }
    } catch (error) {
      ToastError('An error occurred while updating profile data');
    }
  };

  const handleSaveProfilePicture = async () => {
    if (!profilePicture.file) {
      ToastError('No file selected for upload');
      return null;
    }

    const { file } = profilePicture;
    const { name: title, size, type } = file;
    const sanitizedTitle = title.replace(/\s/g, '_');
    const fileKey = `media/users/pictures/${user?.username}/${sanitizedTitle}`;

    try {
      const presignedUrl = await fetchS3SignedURL({
        bucket: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}`,
        key: fileKey,
      });

      const uploadResponse = await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
            setProfilePicturePercentage(percentage);
          }
        },
      });

      if (uploadResponse.status === 200) {
        const backendResponse = await uploadProfilePicture({
          key: fileKey,
          title,
          size,
          type,
        });

        if (backendResponse.status === 200) {
          setProfilePicturePercentage(0);
          ToastSuccess('Profile picture updated successfully!');
          setHasChangesProfilePicture(false);
        }
      }
    } catch (err) {
      ToastError('Error uploading image to S3');
    }

    return null;
  };

  const handleSaveBannerPicture = async () => {
    if (!bannerPicture.file) {
      ToastError('No file selected for upload');
      return null;
    }

    const { file } = bannerPicture;
    const { name: title, size, type } = file;
    const sanitizedTitle = title.replace(/\s/g, '_');
    const fileKey = `media/users/banners/${user?.username}/${sanitizedTitle}`;

    try {
      const presignedUrl = await fetchS3SignedURL({
        bucket: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}`,
        key: fileKey,
      });

      const uploadResponse = await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
            setBannerPicturePercentage(percentage);
          }
        },
      });

      if (uploadResponse.status === 200) {
        const backendResponse = await uploadBannerPicture({
          key: fileKey,
          title,
          size,
          type,
        });

        if (backendResponse.status === 200) {
          setBannerPicturePercentage(0);
          ToastSuccess('Banner picture updated successfully!');
          setHasChangesBannerPicture(false);
        }
      }
    } catch (err) {
      ToastError('Error uploading image to S3');
    }

    return null;
  };

  const handleSaveData = async () => {
    if (
      !hasChanges &&
      !hasChangesProfile &&
      !hasChangesProfilePicture &&
      !hasChangesBannerPicture
    ) {
      ToastWarning('No changes to save.');
      return;
    }

    try {
      setLoading(true);

      // If there are changes in user data, save them
      if (hasChanges) {
        await handleSaveUserData();
      }

      // If there are changes in profile data, save them
      if (hasChangesProfile) {
        await handleSaveProfileData();
      }

      if (hasChangesProfilePicture) {
        await handleSaveProfilePicture();
      }

      if (hasChangesBannerPicture) {
        await handleSaveBannerPicture();
      }
    } catch (error) {
      ToastError('An error occurred while saving changes.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <div>
        <div className="">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h3 className="text-base font-semibold text-gray-900">User Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
            <div className="ml-4 mt-4 shrink-0">
              <Button
                style={{
                  width: '150px',
                }}
                onClick={handleSaveData}
                disabled={
                  loading ||
                  (!hasChanges &&
                    !hasChangesProfile &&
                    !hasChangesProfilePicture &&
                    !hasChangesBannerPicture)
                }
                hoverEffect
              >
                {loading ? <LoadingMoon /> : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>

        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Username</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditText data={username} setData={setUsername} />
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">First Name</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditText data={firstName} setData={setFirstName} />
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Last Name</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditText data={lastName} setData={setLastName} />
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
        <p className="mt-1 text-sm/6 text-gray-500">
          Your public profile information to let the world know more about you.
        </p>

        <ul className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
          <li className="py-6">
            <EditImage
              onLoad={onLoadProfilePicture}
              data={profilePicture}
              setData={setProfilePicture}
              percentage={profilePicturePerceentage}
              title="Profile Picture"
            />
          </li>
          <li className="py-6">
            <EditImage
              onLoad={onLoadBannerPicture}
              data={bannerPicture}
              setData={setBannerPicture}
              percentage={bannerPicturePercentage}
              variant="banner"
              title="Banner Picture"
            />
          </li>
          <li className="py-6">
            <EditRichText title="Biography" data={biography} setData={setBiography} />
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Birthday</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditDate useTime={false} data={birthday} setData={setBirthDay} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Website</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={website} setData={setWebsite} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Instagram</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={instagram} setData={setInstagram} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Facebook</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={facebook} setData={setFacebook} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Threads</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={threads} setData={setThreads} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">LinkedIn</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={linkedin} setData={setLinkedin} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">YouTube</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={youtube} setData={setYouTube} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">TikTok</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={tiktok} setData={setTikTok} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Github</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={github} setData={setGitHub} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Gitlab</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={gitlab} setData={setGitLab} />
            </div>
          </li>
        </ul>
      </div>
    </Container>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
