import {Facebook, Github, Instagram, LinkedinIcon, AlarmClockCheckIcon} from "lucide-react";
import {Link} from "react-router-dom";

export default function Footer(): React.ReactElement {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <AlarmClockCheckIcon className="inline-block h-6 w-6 text-sky-500 dark:text-sky-400 mr-2" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                Task Management
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Resources
                            </h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="https://taskmanagement.com/" className="hover:underline">
                                        Task Management
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https://tailwindcss.com/" className="hover:underline">
                                        Tailwind CSS
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Follow us
                            </h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link
                                        to="https://github.com/themesberg/taskmanagement"
                                        className="hover:underline "
                                    >
                                        Github
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https://discord.gg/4eeurUVvTy" className="hover:underline">
                                        Discord
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Legal
                            </h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="/privacy" className="hover:underline">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terms" className="hover:underline">
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2024{" "}
                        <Link to="/" className="hover:underline">
                            TaskManagement™
                        </Link>
                        . All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <Facebook className="w-4 h-4" />
                            <span className="sr-only">Facebook account</span>
                        </Link>
                        <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <Instagram className="w-4 h-4" />
                            <span className="sr-only">Instagram account</span>
                        </Link>

                        <Link
                            to="https://www.linkedin.com/in/sthsuyash"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                        >
                            <LinkedinIcon className="w-4 h-4" />
                            <span className="sr-only">Linkedin account</span>
                        </Link>
                        <Link
                            to="https://github.com/sthsuyash"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                        >
                            <Github className="w-4 h-4" />
                            <span className="sr-only">Github account</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
