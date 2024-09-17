<script>
    import { goto } from '$app/navigation';  
    const handleColorsClick = () => {
      goto('/management/color');
    };
  
    const handleDevicesClick = () => {
        goto('/management/device');
    };
  
    const handleUsersClick = () => {
        goto('/management/user');
    };
  
    const handleSalonsClick = () => {
        goto('/management/salon');
    };
  </script>
  
  <main>
    <h1>Backend Management Tools</h1>
  
    <section>
      <div class="button-grid">
        <button class="button-colors" on:click={handleColorsClick}>Colors</button>
        <button class="button-devices" on:click={handleDevicesClick}>Devices</button>
        <button class="button-users" on:click={handleUsersClick}>Users</button>
        <button class="button-salons" on:click={handleSalonsClick}>Salons</button>
      </div>
    </section>
  
    <!-- rest of the code -->
  </main>
  
  <style>
    /*main {
      padding: 20px;
    }
  
    h1 {
      font-size: 2rem;
      margin-bottom: 20px;
    }
  
    h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  
    .button-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;
      place-items: center;
    }
  
    button {
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 2.1rem;
      height: 200px;
      transition: background-color 0.3s ease;
      width: 200px;
    }
  
    .button-colors {
      background-color: #007bff;
      color: #fff;
    }
  
    .button-devices {
      background-color: #28a745;
      color: #fff;
    }
  
    .button-users {
      background-color: #ffc107;
      color: #000;
    }
  
    .button-salons {
      background-color: #dc3545;
      color: #fff;
    }
  
    button:hover {
      background-color: #6c757d;
      color: #fff;
    }*/
  </style>