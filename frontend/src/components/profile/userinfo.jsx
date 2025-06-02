import { useEffect, useCallback } from "react";
import { useStore } from "../../store/store-context";
import { observer } from "mobx-react-lite";
import { useNavigate, Link } from "react-router-dom";

const UserInfo = () => {
  const { authStore, userInfoStore } = useStore();

  useEffect(() => {
    const fetchInfo = async () => {
      await userInfoStore.get_info(authStore.token);
    };
    fetchInfo();
  }, [authStore.token, userInfoStore]);

  const formatStorage = (bytes, precision = 3) =>
    (bytes / 2 ** 30).toFixed(bytes === 0 ? 0 : precision);

  return (
    <div className="user-profile-container">
      <header className="profile-header">
        <h1 className="profile-title">Профиль</h1>
        <Link to="/" className="back-link">
          ← Вернуться на главную
        </Link>
      </header>

      <section className="storage-section">
        <h2 className="section-title">Использование хранилища</h2>
        <div className="storage-progress">
          <span className="storage-value">
            {formatStorage(userInfoStore.storage_used)} ГБ
          </span>
          <span className="storage-separator">/</span>
          <span className="storage-total">
            {formatStorage(userInfoStore.storage_max, 0)} ГБ
          </span>
        </div>
      </section>

      <section className="user-details">
        <div className="detail-item">
          <h3 className="detail-label">Имя пользователя</h3>
          <p className="detail-value">{userInfoStore.username}</p>
        </div>

        <div className="detail-item">
          <h3 className="detail-label">Email</h3>
          <p className="detail-value">{userInfoStore.email}</p>
        </div>

        {userInfoStore.admin && (
          <div className="admin-panel">
            <h3 className="admin-label">Администратор</h3>
            <Link to="/admin" className="admin-link">
              Перейти в панель администратора →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default observer(UserInfo);
