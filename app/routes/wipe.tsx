import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <div className="wipePage">
            <style>{`
                .wipePage {
                    max-width: 920px;
                    margin: 0 auto;
                    padding: 28px 18px 40px;
                    color: #0f172a;
                }
                .wipeCard {
                    background: rgba(255, 255, 255, 0.72);
                    border: 1px solid rgba(15, 23, 42, 0.10);
                    border-radius: 16px;
                    padding: 16px;
                    box-shadow: 0 10px 30px rgba(2, 6, 23, 0.08);
                    backdrop-filter: blur(8px);
                }
                .wipeHeader {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: baseline;
                    justify-content: space-between;
                    gap: 8px 12px;
                    margin-bottom: 12px;
                }
                .wipeTitle {
                    font-size: 16px;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                }
                .wipeMeta {
                    font-size: 13px;
                    color: rgba(15, 23, 42, 0.70);
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                }
                .wipeSectionTitle {
                    font-size: 13px;
                    font-weight: 600;
                    color: rgba(15, 23, 42, 0.75);
                    margin: 14px 0 8px;
                }
                .wipeList {
                    display: grid;
                    gap: 8px;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
                .wipeItem {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    padding: 10px 12px;
                    border-radius: 12px;
                    border: 1px solid rgba(15, 23, 42, 0.08);
                    background: rgba(255, 255, 255, 0.70);
                }
                .wipeFileName {
                    font-size: 14px;
                    font-weight: 600;
                    margin: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .wipeHint {
                    font-size: 12px;
                    color: rgba(15, 23, 42, 0.65);
                    margin-top: 10px;
                    line-height: 1.35;
                }
                .wipeActions {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 14px;
                }
                .wipeButton {
                    appearance: none;
                    border: 1px solid rgba(220, 38, 38, 0.30);
                    background: linear-gradient(180deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95));
                    color: white;
                    padding: 10px 14px;
                    border-radius: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: transform 120ms ease, filter 120ms ease, box-shadow 120ms ease;
                    box-shadow: 0 10px 20px rgba(220, 38, 38, 0.20);
                }
                .wipeButton:hover {
                    filter: brightness(1.03);
                    transform: translateY(-1px);
                }
                .wipeButton:active {
                    transform: translateY(0px);
                    filter: brightness(0.98);
                }
                @media (prefers-color-scheme: dark) {
                    .wipePage { color: rgba(226, 232, 240, 0.96); }
                    .wipeCard {
                        background: rgba(2, 6, 23, 0.55);
                        border-color: rgba(148, 163, 184, 0.18);
                        box-shadow: 0 12px 34px rgba(0, 0, 0, 0.35);
                    }
                    .wipeMeta, .wipeSectionTitle, .wipeHint { color: rgba(226, 232, 240, 0.72); }
                    .wipeItem {
                        background: rgba(2, 6, 23, 0.35);
                        border-color: rgba(148, 163, 184, 0.18);
                    }
                }
            `}</style>

            <div className="wipeCard">
                <div className="wipeHeader">
                    <div className="wipeTitle">Wipe (dev utility)</div>
                    <div className="wipeMeta">user: {auth.user?.username ?? "unknown"}</div>
                </div>

                <div className="wipeSectionTitle">Existing files</div>
                <ul className="wipeList">
                {files.map((file) => (
                    <li key={file.id} className="wipeItem">
                        <p className="wipeFileName">{file.name}</p>
                    </li>
                ))}
                </ul>

                <div className="wipeHint">
                    This wipes files in the current app directory and flushes KV. Use carefully.
                </div>

                <div className="wipeActions">
                    <button className="wipeButton" onClick={() => handleDelete()}>
                        Wipe App Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WipeApp;